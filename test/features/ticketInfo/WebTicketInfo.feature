@Web
Feature: Ticket Info under Visit

  As a user,
  I would like to see the 'Ticket Info' on Ticket Information page.

  Background: 
    Given I am on AO web home page
  
  Scenario: can navigate to Ticket Info page
  When I navigate to "Ticket Info" under "VISIT"
  Then I see 'Ticket information' page

  Scenario: can validate the pricing of ticket at an arena
  When I navigate to "Ticket Info" under "VISIT"
  Then I verify the pricing of "Ground Pass ticket" as "29"

  Scenario: can validate the pricing of ticket at an arena
  When I navigate to "Ticket Info" under "VISIT"
  Then I verify the pricing of "Margaret Court Arena ticket" as "65"

  Scenario: can validate the pricing of ticket at an arena
  When I navigate to "Ticket Info" under "VISIT"
  Then I verify the pricing of "Rod Laver Arena ticket" as "109"

  Scenario: can validate the pricing of ticket at an arena
  When I navigate to "Ticket Info" under "VISIT"
  Then I verify the pricing of "John Cain Arena ticket" as "65"
    

  

