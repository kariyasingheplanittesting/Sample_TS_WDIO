@App @Android @Ios
Feature: AO App Scores Screen

  As a user,
  I would like to see the Scores screen
  So I can see the Match Scores

  Background: can see the Scores screen
    Given I am on AO app Home screen

	Scenario: can see content of Live tab in Scores screen
		And there are no live matches in progress 
		When I navigate to "Scores" screen
    Then no details of live matches are visible

  @Skip_For_Ios
	Scenario: can see content of Results tab in Scores screen
		When I navigate to "Scores" screen
		And I navigate to "Results" tab
		And  I am able to see content of the Results screen
		And I select "Day 8" from Days Picker
		Then I can see results up to the match with following players
		| playerOneName | playerTwoName |
		|  S. Bolelli   | 	J. Murray   |
