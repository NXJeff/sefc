<?php
/**
 * Class that operate on table 'speakers'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-09-26 15:58
 */
class SpeakersMySqlDAO implements SpeakersDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return SpeakersMySql 
	 */
	public function load($id){
		$sql = 'SELECT * FROM speakers WHERE name = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($id);
		return $this->getRow($sqlQuery);
	}

	/**
	 * Get all records from table
	 */
	public function queryAll(){
		$sql = 'SELECT * FROM speakers';
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
	 * Get all records from table ordered by field
	 *
	 * @param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn){
		$sql = 'SELECT * FROM speakers ORDER BY '.$orderColumn;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
 	 * Delete record from table
 	 * @param speaker primary key
 	 */
	public function delete($name){
		$sql = 'DELETE FROM speakers WHERE name = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($name);
		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param SpeakersMySql speaker
 	 */
	public function insert($speaker){
		$sql = 'INSERT INTO speakers (language, other_name, contacts, image_url, other_image_urls, view_count, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($speaker->language);
		$sqlQuery->set($speaker->otherName);
		$sqlQuery->set($speaker->contacts);
		$sqlQuery->set($speaker->imageUrl);
		$sqlQuery->set($speaker->otherImageUrls);
		$sqlQuery->set($speaker->viewCount);
		$sqlQuery->set($speaker->description);

		$id = $this->executeInsert($sqlQuery);	
		$speaker->name = $id;
		return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param SpeakersMySql speaker
 	 */
	public function update($speaker){
		$sql = 'UPDATE speakers SET language = ?, other_name = ?, contacts = ?, image_url = ?, other_image_urls = ?, view_count = ?, description = ? WHERE name = ?';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($speaker->language);
		$sqlQuery->set($speaker->otherName);
		$sqlQuery->set($speaker->contacts);
		$sqlQuery->set($speaker->imageUrl);
		$sqlQuery->set($speaker->otherImageUrls);
		$sqlQuery->set($speaker->viewCount);
		$sqlQuery->set($speaker->description);

		$sqlQuery->set($speaker->name);
		return $this->executeUpdate($sqlQuery);
	}

	/**
 	 * Delete all rows
 	 */
	public function clean(){
		$sql = 'DELETE FROM speakers';
		$sqlQuery = new SqlQuery($sql);
		return $this->executeUpdate($sqlQuery);
	}

		public function queryByLanguage($value){
		$sql = 'SELECT * FROM speakers WHERE language = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByOtherName($value){
		$sql = 'SELECT * FROM speakers WHERE other_name = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByContacts($value){
		$sql = 'SELECT * FROM speakers WHERE contacts = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByImageUrl($value){
		$sql = 'SELECT * FROM speakers WHERE image_url = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByOtherImageUrls($value){
		$sql = 'SELECT * FROM speakers WHERE other_image_urls = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByViewCount($value){
		$sql = 'SELECT * FROM speakers WHERE view_count = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByDescription($value){
		$sql = 'SELECT * FROM speakers WHERE description = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}


		public function deleteByLanguage($value){
		$sql = 'DELETE FROM speakers WHERE language = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByOtherName($value){
		$sql = 'DELETE FROM speakers WHERE other_name = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByContacts($value){
		$sql = 'DELETE FROM speakers WHERE contacts = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByImageUrl($value){
		$sql = 'DELETE FROM speakers WHERE image_url = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByOtherImageUrls($value){
		$sql = 'DELETE FROM speakers WHERE other_image_urls = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByViewCount($value){
		$sql = 'DELETE FROM speakers WHERE view_count = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByDescription($value){
		$sql = 'DELETE FROM speakers WHERE description = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}


	
	/**
	 * Read row
	 *
	 * @return SpeakersMySql 
	 */
	protected function readRow($row){
		$speaker = new Speaker();
		
		$speaker->language = $row['language'];
		$speaker->name = $row['name'];
		$speaker->otherName = $row['other_name'];
		$speaker->contacts = $row['contacts'];
		$speaker->imageUrl = $row['image_url'];
		$speaker->otherImageUrls = $row['other_image_urls'];
		$speaker->viewCount = $row['view_count'];
		$speaker->description = $row['description'];

		return $speaker;
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
	 * @return SpeakersMySql 
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

		$sql = 'SELECT * FROM speakers ';

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
		
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
}



?>