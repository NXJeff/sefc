<?php
/**
 * Class that operate on table 'users'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-09-26 15:58
 */
class UsersMySqlDAO implements UsersDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return UsersMySql 
	 */
	public function load($id){
		$sql = 'SELECT * FROM users WHERE login = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($id);
		return $this->getRow($sqlQuery);
	}

	/**
	 * Get all records from table
	 */
	public function queryAll(){
		$sql = 'SELECT * FROM users';
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
	 * Get all records from table ordered by field
	 *
	 * @param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn){
		$sql = 'SELECT * FROM users ORDER BY '.$orderColumn;
		$sqlQuery = new SqlQuery($sql);
		return $this->getList($sqlQuery);
	}
	
	/**
 	 * Delete record from table
 	 * @param user primary key
 	 */
	public function delete($login){
		$sql = 'DELETE FROM users WHERE login = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($login);
		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param UsersMySql user
 	 */
	public function insert($user){
		$sql = 'INSERT INTO users (password, email, fullname, contact, role, status, preferences) VALUES (?, ?, ?, ?, ?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($user->password);
		$sqlQuery->set($user->email);
		$sqlQuery->set($user->fullname);
		$sqlQuery->set($user->contact);
		$sqlQuery->set($user->role);
		$sqlQuery->set($user->status);
		$sqlQuery->set($user->preferences);

		$id = $this->executeInsert($sqlQuery);	
		$user->login = $id;
		return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param UsersMySql user
 	 */
	public function update($user){
		$sql = 'UPDATE users SET password = ?, email = ?, fullname = ?, contact = ?, role = ?, status = ?, preferences = ? WHERE login = ?';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($user->password);
		$sqlQuery->set($user->email);
		$sqlQuery->set($user->fullname);
		$sqlQuery->set($user->contact);
		$sqlQuery->set($user->role);
		$sqlQuery->set($user->status);
		$sqlQuery->set($user->preferences);

		$sqlQuery->set($user->login);
		return $this->executeUpdate($sqlQuery);
	}

	/**
 	 * Delete all rows
 	 */
	public function clean(){
		$sql = 'DELETE FROM users';
		$sqlQuery = new SqlQuery($sql);
		return $this->executeUpdate($sqlQuery);
	}

		public function queryByPassword($value){
		$sql = 'SELECT * FROM users WHERE password = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByEmail($value){
		$sql = 'SELECT * FROM users WHERE email = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByFullname($value){
		$sql = 'SELECT * FROM users WHERE fullname = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByContact($value){
		$sql = 'SELECT * FROM users WHERE contact = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByRole($value){
		$sql = 'SELECT * FROM users WHERE role = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByStatus($value){
		$sql = 'SELECT * FROM users WHERE status = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByPreferences($value){
		$sql = 'SELECT * FROM users WHERE preferences = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}


		public function deleteByPassword($value){
		$sql = 'DELETE FROM users WHERE password = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByEmail($value){
		$sql = 'DELETE FROM users WHERE email = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByFullname($value){
		$sql = 'DELETE FROM users WHERE fullname = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByContact($value){
		$sql = 'DELETE FROM users WHERE contact = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByRole($value){
		$sql = 'DELETE FROM users WHERE role = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByStatus($value){
		$sql = 'DELETE FROM users WHERE status = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByPreferences($value){
		$sql = 'DELETE FROM users WHERE preferences = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}


	
	/**
	 * Read row
	 *
	 * @return UsersMySql 
	 */
	protected function readRow($row){
		$user = new User();
		
		$user->login = $row['login'];
		$user->password = $row['password'];
		$user->email = $row['email'];
		$user->fullname = $row['fullname'];
		$user->contact = $row['contact'];
		$user->role = $row['role'];
		$user->status = $row['status'];
		$user->preferences = $row['preferences'];

		return $user;
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
	 * @return UsersMySql 
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

		$sql = 'SELECT * FROM users ';

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