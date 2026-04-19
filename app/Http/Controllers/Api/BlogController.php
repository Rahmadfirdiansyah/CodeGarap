<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Blog::with('user')->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $Blog = $request->user()->Blogs()->create([
            'title'        => $request->title,
            'content'      => $request->content,
            'thumbnail'    => $request->thumbnail,
            'status'       => $request->status ?? 'draft',
            'published_at' => $request->status === 'published' ? now() : null,
        ]);

        return response()->json(['message' => 'Blog dibuat', 'Blog' => $Blog], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $Blog)
    {
        return response()->json($Blog->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $Blog)
    {
        $Blog->update($request->only(['title', 'content', 'thumbnail', 'status']));

        return response()->json(['message' => 'Blog diupdate', 'Blog' => $Blog]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $Blog)
    {
        $Blog->delete();

        return response()->json(['message' => 'Blog dihapus']);
    }
}
