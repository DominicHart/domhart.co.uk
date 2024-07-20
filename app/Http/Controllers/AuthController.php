<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Photo;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use function Ramsey\Uuid\v1;

class AuthController extends Controller
{
    /**
     * Log user in
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $email = trim(filter_var($request->input('email'), FILTER_SANITIZE_EMAIL));
        $password = trim(strip_tags($request->input('password')));

        $user = User::where('email', $email)
            ->first();

        if ($user) {
            if (!Hash::check($password, $user->password)) {
                return response()->json('Incorrect email or password', 400);
            }

            Auth::login($user);
            $token = $user->createToken('API Token')->plainTextToken;
            session()->regenerate();

            return response()->json(['token' => $token], 200);
        }

        return response()->json('Incorrect email or password', 400);
    }

    /**
     * Logs a user out
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        if (!Auth::user()) {
            return response()->json('You are not authorised to perform this action.', 401);
        }

        Auth::user()->tokens()->delete();

        return response()->json('logged_out', 200);
    }

    /**
     * Get user from session
     *
     * @return JsonResponse
     */
    public function authCheck(): JsonResponse
    {
        if (!Auth::user()) {
            return response()->json('You are not authorised to perform this action.', 401);
        }

        return response()->json(['user' => Auth::user()], 200);
    }
}
