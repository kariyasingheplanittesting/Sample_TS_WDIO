@Web

Feature: Premium Experiences under Visit

  As a user,
  I would like to see the 'Premium Experiences' on Premium Experiences page.

  Background: 
    Given I am on AO web home page
  
  @AODS-6040
  Scenario: can navigate to Premium Experiences page
  When I navigate to "Premium Experiences" under "VISIT"
  Then I see 'Premium Experiences' page