<?php

error_reporting(E_ALL & ~E_NOTICE);
/**
 * Class that operate on table 'audio'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-08-22 16:39
 */
class AudioMySqlDAO implements AudioDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return AudioMySql 
	 */
	public function load($title, $speaker){
		$sql = 'SELECT * FROM audio WHERE title = ?  AND speaker = ? ';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($title);
		$sqlQuery->setNumber($speaker);

		return $this->getRow($sqlQuery);
	}

	/**
	 * Get all records from table
	 */
	public function queryAll(){
		$sql = 'SELECT * FROM audio';
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
	 * Get all records from table ordered by field
	 *
	 * @param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn){
		$sql = 'SELECT * FROM audio ORDER BY '.$orderColumn;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
 	 * Delete record from table
 	 * @param audio primary key
 	 */
	public function delete($title, $speaker){
		$sql = 'DELETE FROM audio WHERE title = ?  AND speaker = ? ';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->setNumber($title);
		$sqlQuery->setNumber($speaker);

		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param AudioMySql audio
 	 */
	public function insert($audio){
		$sql = 'INSERT INTO audio (description, uploaded_user, source, category, language, duration, added_date, filesize, play_count, url, title, speaker) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($audio->description);
		$sqlQuery->set($audio->uploadedUser);
		$sqlQuery->set($audio->source);
		$sqlQuery->set($audio->category);
		$sqlQuery->set($audio->language);
		$sqlQuery->set($audio->duration);
		$sqlQuery->set($audio->addedDate);
		$sqlQuery->set($audio->filesize);
		$sqlQuery->set($audio->playCount);
		$sqlQuery->set($audio->url);

		
		$sqlQuery->setNumber($audio->title);

		$sqlQuery->setNumber($audio->speaker);

		$this->executeInsert($sqlQuery);	
		//$audio->id = $id;
		//return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param AudioMySql audio
 	 */
	public function update($audio){
		$sql = 'UPDATE audio SET description = ?, uploaded_user = ?, source = ?, category = ?, language = ?, duration = ?, added_date = ?, filesize = ?, play_count = ?, url = ? WHERE title = ?  AND speaker = ? ';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($audio->description);
		$sqlQuery->set($audio->uploadedUser);
		$sqlQuery->set($audio->source);
		$sqlQuery->set($audio->category);
		$sqlQuery->set($audio->language);
		$sqlQuery->set($audio->duration);
		$sqlQuery->set($audio->addedDate);
		$sqlQuery->set($audio->filesize);
		$sqlQuery->set($audio->playCount);
		$sqlQuery->set($audio->url);

		
		$sqlQuery->setNumber($audio->title);

		$sqlQuery->setNumber($audio->speaker);

		return $this->executeUpdate($sqlQuery);
	}

	/**
 	 * Delete all rows
 	 */
	public function clean(){
		$sql = 'DELETE FROM audio';
		$sqlQuery = new SqlQuery($sql);
		return $this->executeUpdate($sqlQuery);
	}

	public function queryByDescription($value){
		$sql = 'SELECT * FROM audio WHERE description = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUploadedUser($value){
		$sql = 'SELECT * FROM audio WHERE uploaded_user = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryBySource($value){
		$sql = 'SELECT * FROM audio WHERE source = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByCategory($value){
		$sql = 'SELECT * FROM audio WHERE category = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByLanguage($value){
		$sql = 'SELECT * FROM audio WHERE language = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByDuration($value){
		$sql = 'SELECT * FROM audio WHERE duration = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByAddedDate($value){
		$sql = 'SELECT * FROM audio WHERE added_date = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByFilesize($value){
		$sql = 'SELECT * FROM audio WHERE filesize = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByPlayCount($value){
		$sql = 'SELECT * FROM audio WHERE play_count = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUrl($value){
		$sql = 'SELECT * FROM audio WHERE url = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}


	public function deleteByDescription($value){
		$sql = 'DELETE FROM audio WHERE description = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUploadedUser($value){
		$sql = 'DELETE FROM audio WHERE uploaded_user = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteBySource($value){
		$sql = 'DELETE FROM audio WHERE source = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByCategory($value){
		$sql = 'DELETE FROM audio WHERE category = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByLanguage($value){
		$sql = 'DELETE FROM audio WHERE language = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByDuration($value){
		$sql = 'DELETE FROM audio WHERE duration = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByAddedDate($value){
		$sql = 'DELETE FROM audio WHERE added_date = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByFilesize($value){
		$sql = 'DELETE FROM audio WHERE filesize = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByPlayCount($value){
		$sql = 'DELETE FROM audio WHERE play_count = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUrl($value){
		$sql = 'DELETE FROM audio WHERE url = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}


	
	/**
	 * Read row
	 *
	 * @return AudioMySql 
	 */
	protected function readRow($row){
		$audio = new Audio();
		
		$audio->description = $row['description'];
		$audio->uploadedUser = $row['uploaded_user'];
		$audio->source = $row['source'];
		$audio->category = $row['category'];
		$audio->language = $row['language'];
		$audio->title = $row['title'];
		$audio->speaker = $row['speaker'];
		$audio->duration = $row['duration'];
		$audio->addedDate = $row['added_date'];
		$audio->filesize = $row['filesize'];
		$audio->playCount = $row['play_count'];
		$audio->url = $row['url'];

		return $audio;
	}
	
	protected function getList($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);
		$ret = array();
		for($i=0;$i<count($tab);$i++){
			$ret[$i] = $this->readRow($tab[$i]);
		}
		return $ret;
	}
	
	/**
	 * Get row
	 *
	 * @return AudioMySql 
	 */
	protected function getRow($sqlQuery){
		$tab = QueryExecutor::execute($sqlQuery);
		if(count($tab)==0){
			return null;
		}
		return $this->readRow($tab[0]);		
	}
	
	/**
	 * Execute sql query
	 */
	protected function execute($sqlQuery){
		return QueryExecutor::execute($sqlQuery);
	}
	
		
	/**
	 * Execute sql query
	 */
	protected function executeUpdate($sqlQuery){
		return QueryExecutor::executeUpdate($sqlQuery);
	}

	/**
	 * Query for one row and one column
	 */
	protected function querySingleResult($sqlQuery){
		return QueryExecutor::queryForString($sqlQuery);
	}

	/**
	 * Insert row to table
	 */
	protected function executeInsert($sqlQuery){
		return QueryExecutor::executeInsert($sqlQuery);
	}

	/*
	*	Convenient method to check the variable is empty or not
	*/
	protected function IsNullOrEmptyString($param){
		return (!isset($param) || trim($param)==='');
	}

	/**
	 * Pagination Fetching 
	 *
	 * @param $orderColumn column name
	 */
	public function queryLazyLoad($offset, $item, $whereClause, $orderColumn, $orderAs){

		if(!$offset || !$item) {
			$offset = 0;
			$item = 10;
			// $orderColumn = 'title';
			// $orderAs = 'desc';
		}

		$sql = 'SELECT * FROM audio ';

		if(!$this->IsNullOrEmptyString($whereClause)) 
		{
			$sql .= ' WHERE ' .$whereClause .' ';
		}

		if(!$this->IsNullOrEmptyString($orderColumn))
		{ 
			$sql .= ' ORDER BY ' .$orderColumn; 
		}

		if(!$this->IsNullOrEmptyString($orderAs)) 
		{ 
			$sql .= ' '.$orderAs. ' '; 
		}

		$sql .= 'LIMIT ' . $offset .','. $item;
		
		// echo $sql;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
}
?>