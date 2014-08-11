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

	public function get_id()
	{
	    return $this->_id;
	}
	
	public function set_id($_id)
	{
	    $this->_id = $_id;
	    return $this;
	}

	public function get_login()
	{
	    return $this->_login;
	}
	
	public function set_login($_login)
	{
	    $this->_login = $_login;
	    return $this;
	}

	public function get_password()
	{
	    return $this->_password;
	}
	
	public function set_password($_password)
	{
	    $this->_password = $_password;
	    return $this;
	}

	public function get_email()
	{
	    return $this->_email;
	}
	
	public function set_email($_email)
	{
	    $this->_email = $_email;
	    return $this;
	}

	public function get_fullname()
	{
	    return $this->_fullname;
	}
	
	public function set_fullname($_fullname)
	{
	    $this->_fullname = $_fullname;
	    return $this;
	}

	public function get_contact()
	{
	    return $this->_contact;
	}
	
	public function set_contact($_contact)
	{
	    $this->_contact = $_contact;
	    return $this;
	}

	public function get_role()
	{
	    return $this->_role;
	}
	
	public function set_role($_role)
	{
	    $this->_role = $_role;
	    return $this;
	}
}

?>