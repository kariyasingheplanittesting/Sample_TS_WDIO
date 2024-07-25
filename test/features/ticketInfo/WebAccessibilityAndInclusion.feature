@Web

Feature: Accessibility & Inclusion under Visit

  As a user,
  I would like to see the 'ccessibility & Inclusion' on Accessibility page.

  Background: 
    Given I am on AO web home page
  
  @AODS-6040
  Scenario: can navigate to Accessibility & Inclusion page
  When I navigate to "Accessibility & Inclusion" under "VISIT"
  Then I see 'Accessibility & inclusion' page