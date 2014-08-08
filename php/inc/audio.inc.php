<?php

class Audio 
{
	private $_id;
	private $_source;
	private $_category;
	private $_language;
	private $_title;
	private $_speaker;
	private $_duration;
	private $_added_date;
	private $_filesize;
	private $_play_count;
	private $_url;
	private $_uploaduser;

	public function __construct(
		$id,
		$source,
		$category,
		$language,
		$title,
		$speaker,
		$duration,
		$added_date,
		$filesize,
		$play_count,
		$url,
		$uploaduser) 
	{
		$this->_id = $id;
		$this->_source  = $source;
		$this->_category  = $category;
		$this->_language  = $language;
		$this->_title  = $title;
		$this->_speaker  = $speaker;
		$this->_duration  = $duration;
		$this->_added_date  = $added_date;
		$this->_filesize  = $filesize;
		$this->_play_count  = $play_count;
		$this->_url  = $url;
		$this->_uploaduser  = $uploaduser;
	}
}

?>