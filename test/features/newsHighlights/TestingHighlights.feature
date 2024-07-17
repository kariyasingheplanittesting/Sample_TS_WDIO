@Web
Feature: AO Web-Highlights

  As a user,
  I would like to see the 'News Highlights' on Highlights page.

  Background: 
    Given I am on AO web home page
    And I navigate to 'News' under 'NEWS'
    And I see 'News' page is loaded

  Scenario: clicking on an AO Match Highlight video
    Then I see "AO Match Highlights"
    Then I click on video "Stefanos Tsitsipas v Novak Djokovic Highlights (F) | Australian Open 2023" under "AO Match Highlights"
    Then I verify Video is playing
  
  # Scenario: clicking on an AO Match Highlight video
  #   Then I see "AO Interviews"
  #   Then I click on video "Stefanos Tsitsipas Press Conference | Australian Open 2023 Final" under "AO Interviews" and verify the video player

  # Scenario: clicking on an AO Match Highlight video
  #   Then I see "Infosys Shot of the Day"
  #   Then I click on video "Tsitsipas' forehand flourish | Infosys shot of the day | Day 12" under "Infosys Shot of the Day" and verify the video player
