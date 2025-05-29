<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function redirect()
    {
        $query = http_build_query([
            'client_id' => config('passport.personal_access_client.id'),
            'redirect_uri' => config('app.url') . '/auth/callback',
            'response_type' => 'code',
            'scope' => '',
            'state' => bin2hex(random_bytes(16)),
            'code_challenge' => $this->generateCodeChallenge(session()->get('code_verifier')),
            'code_challenge_method' => 'S256',
        ]);

        return redirect(config('passport.authorization_endpoint') . '?' . $query);
    }

    public function callback(Request $request)
    {
        $http = new \GuzzleHttp\Client;

        $response = $http->post(config('passport.token_endpoint'), [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => config('passport.personal_access_client.id'),
                'redirect_uri' => config('app.url') . '/auth/callback',
                'code_verifier' => session()->get('code_verifier'),
                'code' => $request->code,
            ],
        ]);

        return json_decode((string) $response->getBody(), true);
    }

    private function generateCodeVerifier()
    {
        return bin2hex(random_bytes(32));
    }

    private function generateCodeChallenge($verifier)
    {
        $hash = hash('sha256', $verifier, true);
        return rtrim(strtr(base64_encode($hash), '+/', '-_'), '=');
    }
}
