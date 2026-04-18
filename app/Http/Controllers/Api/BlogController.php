<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(blog::with('user')->latest()->get());
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

        $blog = $request->user()->blogs()->create([
            'title'        => $request->title,
            'content'      => $request->content,
            'thumbnail'    => $request->thumbnail,
            'status'       => $request->status ?? 'draft',
            'published_at' => $request->status === 'published' ? now() : null,
        ]);

        return response()->json(['message' => 'Blog dibuat', 'blog' => $blog], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(blog $blog)
    {
        return response()->json($blog->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, blog $blog)
    {
        $blog->update($request->only(['title', 'content', 'thumbnail', 'status']));

        return response()->json(['message' => 'Blog diupdate', 'blog' => $blog]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(blog $blog)
    {
        $blog->delete();

        return response()->json(['message' => 'Blog dihapus']);
    }
}
