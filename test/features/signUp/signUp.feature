@Web @AODS-5649 @deprecated
Feature: Sign Up on HomePage

  As a user,
  I would like to sign up to exclusive offers on the Home Page.

  Background: 
    Given I am on AO web home page
    
  Scenario: I can enter the details and submit to sign up 
   
    When I enter the email as "emailtest@email.com"
    And I select country from the dropdown as "Åland Islands"
    And I select the consent checkbox
    And I click on submit button
    Then I can see subscription successful message
    