<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\Contact;

class ContactController
{
    /**
     * @var Contact
     */
    protected $_contactService;

    public function __construct(Contact $contactService)
    {
        $this->_contactService = $contactService;
    }

    /**
     * Submit a new contact form
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function submit(Request $request): JsonResponse
    {
        return response()->json('Form submitted!', 200);
    }
}
