@Web @AODS-5895
Feature: AO Web-News Feed

  As a user,
  I would like to see the latest news on home page. 
  So, I can read the latest news articles

  Background:
    Given I am on AO web home page
    When I navigate to "Listen to the AO" under "NEWS"
    Then I can see the Listen to the AO page

  Scenario: can navigate to AO live radio page
    When I navigate to Ao Live Radio page
    Then I can see "Listen to the AO" title on AO radio

  Scenario: can navigate to AO show page
    When I navigate to The AO Show page
    Then I can see "Listen to the AO" title on AO podcast

    Scenario: can navigate to Listen to the AO page and verify the heading
    When I navigate to The AO Show page
    Then I can see "Action Audio presented by Mastercard" heading