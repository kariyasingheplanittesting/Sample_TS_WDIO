@Web

Feature: Travel Packages under Visit

  As a user,
  I would like to see the 'Travel Packages' on Premium Experiences page.

  Background: 
    Given I am on AO web home page
  
  @AODS-6040
  Scenario: can navigate to Ticket Info page
  When I navigate to "Travel Packages" under "VISIT"
  Then I see 'AO Travel Packages' page