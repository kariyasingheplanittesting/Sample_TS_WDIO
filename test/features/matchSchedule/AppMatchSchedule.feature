@App @Android
Feature: AO App Match Schedule Screen

	As a user,
	I would like to see the Schedule screen
	So I can see the Match Schedule

	Background:

	Scenario: can see Schedule screen content
		Given I am on AO app Home screen
		When I navigate to "Schedule" screen
		And  I am able to see content of the Schedule screen
		And I select "Day 2" from Days Picker
		Then I can see schedules up to the match with following players
			| playerOneName | playerTwoName |
			| A.Sabalenka   | T.Martincova  |
