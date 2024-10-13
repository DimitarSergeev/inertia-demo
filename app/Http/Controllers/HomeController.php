<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::paginate(5);
        return Inertia::render('Home', [
            "posts" => $posts
        ]);
    }
    public function postCreateIndex()
    {
        return Inertia::render('CreatePost');
    }
    public function storePost(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
        Post::create([
            'title' => $request->title,
            'content' => $request->content
        ]);
        return redirect()->route('home');
    }
    public function postIndex($id)
    {
        $postData = Post::find($id);
        return Inertia::render('EditPost', [
            'postData' => $postData
        ]);
    }
    public function updatePost(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
        Post::find($id)->update([
            'title' => $request->title,
            'content' => $request->content
        ]);
        return redirect()->route('home')->with('message', 'Post updated successfully!');
    }
}
