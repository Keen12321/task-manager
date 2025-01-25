<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\PersonalAccessTokenResult;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (auth()->attempt($request->only('email', 'password'))) {
            $user = auth()->user();
            $token = $user->createToken('Task Manager Token')->accessToken;
    
            return response()->json([
                'user'  => $user,
                'token' => $token,
            ]);
        }
    
        return response()->json(['message' => 'Email or Password is not found'], 401);
    }
    
    public function logout(Request $request)
    {
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });
    
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function index(Request $request)
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404); // Return 404 if user not found
        }

        return response()->json($user, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // If the user is logged in, don't create a new token, but still create the user
        if (auth()->check()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            return response()->json([
                'user' => $user
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('Task Manager Token')->accessToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
}
