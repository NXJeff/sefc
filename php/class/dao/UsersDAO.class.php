<?php
/**
 * Intreface DAO
 *
 * @author: http://phpdao.com
 * @date: 2014-08-21 17:28
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
	public function delete($user_login);
	
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

	public function queryByUserPassword($value);

	public function queryByUserEmail($value);

	public function queryByUserFullname($value);

	public function queryByUserContact($value);

	public function queryByUserRole($value);


	public function deleteByUserPassword($value);

	public function deleteByUserEmail($value);

	public function deleteByUserFullname($value);

	public function deleteByUserContact($value);

	public function deleteByUserRole($value);


}
?>