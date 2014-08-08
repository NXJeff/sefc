<?php

class User 
{
	private $_id;
	private $_login;
	private $_password;
	private $_email;
	private $_fullname;
	private $_contact;
	private $_role;

	public function __construct($id, $login, $password, $email, $fullname, $contact, $role) 
	{
		$this->_id = $id;
		$this->_login = $login;
		$this->_password = $password;
		$this->_email = $email;
		$this->_fullname = $fullname;
		$this->_contact = $contact;
		$this->_role = $role;
	}
}

?>