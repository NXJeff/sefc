<?php

class Speaker 
{
	private $_id;
	private $_language;
	private $_name;
	private $_othername;
	private $_contact;
	private $_img;
	private $_other_img;
	private $_view_count;
	private $_description;

	public function __construct($id, $language, $name, $email, $othername, $img, $other_img, $view_count, $description) 
	{
		$this->_id = $id;
		$this->_language = $language;
		$this->_name = $name;
		$this->_othername = $othername;
		$this->_contact = $contact;
		$this->_img = $img;
		$this->_other_img = $other_img;
		$this->_view_count = $view_count;
		$this->_description = $description;
	}

	public function getId()
	{
	    return $this->_id;
	}
	
	public function setId($_id)
	{
	    $this->_id = $_id;
	    return $this;
	}

	public function getLanguage()
	{
	    return $this->_language;
	}
	
	public function setLanguage($_language)
	{
	    $this->_language = $_language;
	    return $this;
	}

	public function getName()
	{
	    return $this->_name;
	}
	
	public function setName($_name)
	{
	    $this->_name = $_name;
	    return $this;
	}

	public function getOthername()
	{
	    return $this->_othername;
	}
	
	public function setOthername($_othername)
	{
	    $this->_othername = $_othername;
	    return $this;
	}

	public function getContact()
	{
	    return $this->_contact;
	}
	
	public function setContact($_contact)
	{
	    $this->_contact = $_contact;
	    return $this;
	}

	public function getImg()
	{
	    return $this->_img;
	}
	
	public function setImg($_img)
	{
	    $this->_img = $_img;
	    return $this;
	}

	public function getOtherImg()
	{
	    return $this->_other_img;
	}
	
	public function setOtherImg($_other_img)
	{
	    $this->_other_img = $_other_img;
	    return $this;
	}

	public function getViewCount()
	{
	    return $this->_view_count;
	}
	
	public function setViewCount($_view_count)
	{
	    $this->_view_count = $_view_count;
	    return $this;
	}

	public function getDescription()
	{
	    return $this->_description;
	}
	
	public function setDescription($_description)
	{
	    $this->_description = $_description;
	    return $this;
	}

}

?>