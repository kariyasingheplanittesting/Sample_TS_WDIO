@App
@Android
@Smoke
Feature: AO App-Draws

  As a user,
  I would like to see the match draws details. So, I can see the all match events

  Background:
    Given I am on AO app Home screen
    When I navigate to "Draws" screen

  @AODS-6117
  Scenario: can see match card for selected round 1
    Then I select Round 1 by using index "0"
    Then I can see match cards for that round

 