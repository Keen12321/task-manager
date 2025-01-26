<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function find($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    public function getTasksByUser(Request $request)
    {
        $tasks = Task::where('assigned_to', $request->user()->id)->get();
        return response()->json($tasks);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date|after_or_equal:today',
            'assigned_to' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'priority' => $request->priority,
            'due_date' => Carbon::parse($request->due_date)->toDateString(),
            'assigned_to' => $request->assigned_to,
            'project_id' => $request->project_id,
        ]);

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
            'priority' => 'sometimes|required|in:low,medium,high',
            'due_date' => 'nullable|date|after_or_equal:today',
            'assigned_to' => 'sometimes|required|exists:users,id',
            'project_id' => 'sometimes|required|exists:projects,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $task = Task::findOrFail($id);

        $task->update([
            'name' => $request->has('name') ? $request->name : $task->name,
            'description' => $request->has('description') ? $request->description : $task->description,
            'status' => $request->has('status') ? $request->status : $task->status,
            'priority' => $request->has('priority') ? $request->priority : $task->priority,
            'due_date' => $request->has('due_date') ? Carbon::parse($request->due_date)->toDateString() : $task->due_date,
            'assigned_to' => $request->has('assigned_to') ? $request->assigned_to : $task->assigned_to,
            'project_id' => $request->has('project_id') ? $request->project_id : $task->project_id,
        ]);
    
        return response()->json($task);
    }

    public function delete($id)
    {
        $task = Task::findOrFail($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
