@Web

Feature: Getting Here under Visit

  As a user,
  I would like to see the 'Getting Here' on Getting to the AO page.

  Background: 
    Given I am on AO web home page
  
  @AODS-6040
  Scenario: can navigate to Getting here page
  When I navigate to "Getting Here" under "VISIT"
  Then I see 'Getting to the AO' page