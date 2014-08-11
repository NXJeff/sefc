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

	 public function setId($id)
    {
        $this->_id = $id;
    }
    
    public function getId()
    {
        return $this->_id;
    }

    public function setSource($source)
    {
        $this->_source = $source;
    }
    
    public function getSource()
    {
        return $this->_source;
    }

    public function setCategory($category)
    {
        $this->_category = $category;
    }
    
    public function getCategory()
    {
        return $this->_category;
    }

    public function setLanguage($language)
    {
        $this->_language = $language;
    }
    
    public function getLanguage()
    {
        return $this->_language;
    }

    public function setTitle($title) 
    {
        $this->_title = $title;
    }

    public function getTitle() 
    {
        return $this->_title;
    }

    public function setSpeaker($speakerId) 
    {
        $this->_speaker = $speakerId;
    }

    public function getSpeaker() 
    {
        return $this->_speaker;
    }

    public function setDuration($duration)
    {
        $this->_duration = $duration;
    }

    public function getDuration() 
    {
        return $this->_duration;
    }

    public function getAddedDate()
    {
        return $this->_added_date;
    }
    
    public function setAddedDate($_added_date)
    {
        $this->_added_date = $_added_date;
        return $this;
    }

    public function getFilesize()
    {
        return $this->_filesize;
    }
    
    public function setFilesize($_filesize)
    {
        $this->_filesize = $_filesize;
        return $this;
    }

    public function getPlayCount()
    {
        return $this->_play_count;
    }
    
    public function setPlayCount($_play_count)
    {
        $this->_play_count = $_play_count;
        return $this;
    }

    public function getUrl()
    {
        return $this->_url;
    }
    
    public function setUrl($_url)
    {
        $this->_url = $_url;
        return $this;
    }

    public function getUploaduser()
    {
        return $this->_uploaduser;
    }
    
    public function setUploaduser($_uploaduser)
    {
        $this->_uploaduser = $_uploaduser;
        return $this;
    }
}

?>