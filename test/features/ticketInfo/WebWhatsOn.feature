@Web

Feature: What's On under Visit

  As a user,
  I would like to see the 'What's On' on What's On page.

  Background: 
    Given I am on AO web home page
  
  @AODS-6040
  Scenario: can navigate to What's On page
  When I navigate to "What" under "VISIT"
  Then I see 'What's On' page

  