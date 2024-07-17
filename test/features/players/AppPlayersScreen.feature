@App @Android @Ios 
Feature: AO App Players Screen

  As a user,
  I would like to see the Players screen
  So I can see the Match Players

  Background: can see the Players screen
    Given I am on AO app Home screen
		And I can see content of the Home screen

	@Skip_For_Ios	
	Scenario: can see contents of Men tab in Players screen
		When I navigate to "Players" screen
		And I navigate to "Men" tab
		Then I can see "Radu Albot" is in the list

	@Skip_For_Ios	
	Scenario: can see contents of Women tab in Players screen
		When I navigate to "Players" screen
		When I navigate to "Women" tab
		Then I can see "Bianca Andreescu" is in the list
  
	Scenario: can see contents of Favourites tab in Players screen
		When I selected "R. Nadal" from Suggested Players list
		And I add player "Rafael Nadal" to the Favourites list
		And I navigate to "Players" screen
		Then I can see "Rafael Nadal" is in the list