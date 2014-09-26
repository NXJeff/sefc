<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2014-09-26 15:58
 */
interface UsersDAO{

	/**
	 * Get Domain object by primry key
	 *
	 * @param String $id primary key
	 * @Return Users 
	 */
	public function load($id);

	/**
	 * Get all records from table
	 */
	public function queryAll();
	
	/**
	 * Get all records from table ordered by field
	 * @Param $orderColumn column name
	 */
	public function queryAllOrderBy($orderColumn);
	
	/**
 	 * Delete record from table
 	 * @param user primary key
 	 */
	public function delete($login);
	
	/**
 	 * Insert record to table
 	 *
 	 * @param Users user
 	 */
	public function insert($user);
	
	/**
 	 * Update record in table
 	 *
 	 * @param Users user
 	 */
	public function update($user);	

	/**
	 * Delete all rows
	 */
	public function clean();

	public function queryByPassword($value);

	public function queryByEmail($value);

	public function queryByFullname($value);

	public function queryByContact($value);

	public function queryByRole($value);

	public function queryByStatus($value);

	public function queryByPreferences($value);


	public function deleteByPassword($value);

	public function deleteByEmail($value);

	public function deleteByFullname($value);

	public function deleteByContact($value);

	public function deleteByRole($value);

	public function deleteByStatus($value);

	public function deleteByPreferences($value);


}
?>