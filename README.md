
		#OUR STEPS

  1. We forked repositry from SriJyestham/csbc1030 for the app source code. ( Manjinder Singh's Repositry )
  2. Yashdeep Tehlan ran the project in his local system.
  3. Aditya Kuchal checked for bugs.
  4. All four of us planned the next steps. Chandrashekar's input was most prominent.
  5. We setup the GCP Run instance.
  6. We setup the workflow file in git actions.
  7. We setup the docker image
  8. We tried deploying using cloudsql ( Mysql Instance ) but coud not get it running.
  9. Chandrashekar suggested using mysql at the AVIEN database cloud.
  10. We completed its congfiguration by setting up the ip and dns.
  11. We tested the deployment by git actions.
  12. Resolved errors in yaml file, everyone searched for the answers on stackeroverflow like sites.
  13. Tried building and deploying, was succesfull.
  14. Tested the app in postman. ( https://rap-liqchmzala-uk.a.run.app/ )
  15. Checked the settings and files again.
  16. Commited and Merged the changes to SriJyestham/csbc1030/final_project
  17. Most of the steps were completed together not individually so can not comment single name for a steps.
      
   
   
   			Instructions to run program

    In Bash :
                1. cd csbc1030/assignment_08

				2. Login to mysql

				3. create database ASSIGNMENT_08; 
				
				4. use database ASSIGNMENT_08;

				5. INSERT INTO User (email, name, password) VALUES
					('a@mail.com', 'a', '$2b$10$gClrAclaFpPWkYf64ZMn0e8uy6.ODX/1OFIjBJC5EOSfSmuMLc4ES'),
					('b@mail.com', 'b', '$2b$10$XzS0i4QTGtwJUAnKM6ZgSOLImNh71WgA5nzqCPG/6PhfFFIciIN5e');	
 				
				6. npm i
                
				7. node index.js
				
				8. To Login, Open the following url in browser for Access('/')
					http://localhost:3000/api/users/login

				9. Json Body example for auth
		
					{
						"email": "a@mail.com",
						"password": "123"
					}
		
				10. Open the following url in browser for get('/')
					http://localhost:3000/api/users
		
				11: Open the following url in browser for get('/:id')
					http://localhost:3000/api/users/{id}
				
				12: Open the following url in browser for new users, post('/')
					http://localhost:3000/api/users

					Json Body example
						{
						"email": "a@mail.com",
						"name": "a",
						"password": "1234"
						}

				13. Open the following url in browser to test the Cloud Instance of the app in postman
    				    and use the links similar to above steps to test out the application.
    						https://rap-liqchmzala-uk.a.run.app/

    ## Instructions

1. Create a containerized version of the Node application developed in the final project for CSBC-1030
2. Deploy the container to Cloud Run
3. Deploy a managed database and connect it to the deployed container
4. create a CI/CD workflow to automatically test and lint on every Pull Request
5. create a CI/CD workflow to automatically deploy new versions of the application on every merge to develop.
