@Web
Feature: AO Web-Draws



  As a user,
  I would like to see the match draws details. So, I can see the all match events

  Background: 
    Given I am on AO web home page
    And I navigate to 'Draws' under 'TOURNAMENT'
    And I see Draws page has loaded

  Scenario: can see Match Events on 'Draws' page
    Then I can see the match events filter
  
  Scenario: can see Men's Singles as default option in events
    Then I can see the "Men's Singles" as default event

  Scenario: can see matches for the selected event 
    When I filtered matches by event "Men's Doubles"
    Then I can see Matches for "Men's Doubles"

  Scenario: can search players in the matches for selected event
    When I filtered matches by event "Men's Doubles"
    And I search player "Murray"
    Then I see all the matches played by "Murray"
