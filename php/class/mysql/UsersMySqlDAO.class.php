<?php
/**
 * Class that operate on table 'users'. Database Mysql.
 *
 * @author: http://phpdao.com
 * @date: 2014-08-22 16:39
 */
class UsersMySqlDAO implements UsersDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @return UsersMySql 
	 */
	public function load($id){
		$sql = 'SELECT * FROM users WHERE user_login = ?';
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
	public function delete($user_login){
		$sql = 'DELETE FROM users WHERE user_login = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($user_login);
		return $this->executeUpdate($sqlQuery);
	}
	
	/**
 	 * Insert record to table
 	 *
 	 * @param UsersMySql user
 	 */
	public function insert($user){
		$sql = 'INSERT INTO users (user_password, user_email, user_fullname, user_contact, user_role) VALUES (?, ?, ?, ?, ?)';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($user->userPassword);
		$sqlQuery->set($user->userEmail);
		$sqlQuery->set($user->userFullname);
		$sqlQuery->set($user->userContact);
		$sqlQuery->set($user->userRole);

		$id = $this->executeInsert($sqlQuery);	
		$user->userLogin = $id;
		return $id;
	}
	
	/**
 	 * Update record in table
 	 *
 	 * @param UsersMySql user
 	 */
	public function update($user){
		$sql = 'UPDATE users SET user_password = ?, user_email = ?, user_fullname = ?, user_contact = ?, user_role = ? WHERE user_login = ?';
		$sqlQuery = new SqlQuery($sql);
		
		$sqlQuery->set($user->userPassword);
		$sqlQuery->set($user->userEmail);
		$sqlQuery->set($user->userFullname);
		$sqlQuery->set($user->userContact);
		$sqlQuery->set($user->userRole);

		$sqlQuery->set($user->userLogin);
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

		public function queryByUserPassword($value){
		$sql = 'SELECT * FROM users WHERE user_password = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUserEmail($value){
		$sql = 'SELECT * FROM users WHERE user_email = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUserFullname($value){
		$sql = 'SELECT * FROM users WHERE user_fullname = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUserContact($value){
		$sql = 'SELECT * FROM users WHERE user_contact = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}

	public function queryByUserRole($value){
		$sql = 'SELECT * FROM users WHERE user_role = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->getList($sqlQuery);
	}


		public function deleteByUserPassword($value){
		$sql = 'DELETE FROM users WHERE user_password = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUserEmail($value){
		$sql = 'DELETE FROM users WHERE user_email = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUserFullname($value){
		$sql = 'DELETE FROM users WHERE user_fullname = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUserContact($value){
		$sql = 'DELETE FROM users WHERE user_contact = ?';
		$sqlQuery = new SqlQuery($sql);
		$sqlQuery->set($value);
		return $this->executeUpdate($sqlQuery);
	}

	public function deleteByUserRole($value){
		$sql = 'DELETE FROM users WHERE user_role = ?';
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
		
		$user->userLogin = $row['user_login'];
		$user->userPassword = $row['user_password'];
		$user->userEmail = $row['user_email'];
		$user->userFullname = $row['user_fullname'];
		$user->userContact = $row['user_contact'];
		$user->userRole = $row['user_role'];

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