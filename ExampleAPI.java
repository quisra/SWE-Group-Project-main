package edu.sweproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;

/**
 * This is an example of a REST api
 * 
 * Maven is going to be required to run the application (Its a package manager like pip for python or npm for javascript)
 */
@SpringBootApplication
@RestController
public class ExampleAPI {
  /**
   * Main method starts the server on port 8080
   * 
   * On a local dev enviornment its going to be at 'http://localhost:8080'
   * On heroku its going to be at 'https://alex-keo-example-url.herokuapp.com'
   */
  public static void main(String[] args) { 
    SpringApplication.run(ExampleAPI.class, args);
  }

  /**
   * Example method creates new route for getting users
   * 
   * On a local dev enviornment its going to be at 'http://localhost:8080/users'
   * On heroku its going to be at 'https://alex-keo-example-url.herokuapp.com/users'
   * 
   */
  @GetMapping("/users")
  public String users() {
    //This would be a call to your code which would then query the database
    String[] userData = exampleDatabaseCall();

    //Json objects are used to ensure the data is formatted correctly so that the frontend can parse it
    JSONObject usersJson = new JSONObject();

    //Creates a new json object for every user, generally it would have multiple parameters like nNumber, name, DoB, etc.
    //This results in usersJson being a list of objects which would look as follows:
    // [{name: "user1"},{name: "user2"},{name: "user3"}]
    for(String user: userData) {
      JSONObject userInfo = new JSONObject();
      userInfo.put("name", user);

      usersJson.put(userInfo);
    }

    return usersJson.toString();
  }


  private static String[] exampleDatabaseCall() {
    return ["user1", "user2", "user3"];
  }
}