@App @Android @Ios 
Feature: AO App News Screen

  As a user,
  I would like to see the News screen
  So I can see the Match News

  Background:

	Scenario: can see contents of News screen
    Given I am on AO app Home screen
		When I navigate to "News" screen
		Then I can see the news content