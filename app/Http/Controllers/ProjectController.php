<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function find($id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'due_date' => 'nullable|date|after_or_equal:today',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $project = Project::create([
            'name' => $request->name,
            'created_by' => $request->user()->id,
            'description' => $request->description,
            'due_date' => Carbon::parse($request->due_date)->toDateString(),
            'status' => $request->status,
        ]);

        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:255',
            'due_date' => 'nullable|date|after_or_equal:today',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $project = Project::findOrFail($id);

        $project->update([
            'name' => $request->has('name') ? $request->name : $project->name,
            'description' => $request->has('description') ? $request->description : $project->description,
            'due_date' => $request->has('due_date') ? Carbon::parse($request->due_date)->toDateString() : $project->due_date,
            'status' => $request->has('status') ? $request->status : $project->status,
        ]);

        return response()->json($project);
    }

    public function delete($id)
    {
        $project = Project::findOrFail($id);

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
