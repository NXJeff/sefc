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
}

?>