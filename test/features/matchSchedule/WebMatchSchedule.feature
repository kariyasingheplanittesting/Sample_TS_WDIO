@Web
Feature: AO Web-MatchSchedule

  As a user,
  I would like to see the match schedule details.

  Background:
    Given I am on AO web home page
    And I navigate to "Match Schedule" under "TOURNAMENT"
    And I see 'Match Schedule' page

  Scenario: can see Days Picker panel on 'Match Schedule' page
    Then I see the Days Picker panel
  @Smoke @AODS-5894
  Scenario: can see all of the matches that have been played for the current default day
    Then I see following Day is active by default
      | defaultDay | date   |
      | Day 14     | 29 Jan |
    And I see scheduled matches

  Scenario: can navigate to Player Profile
    And I can see following players on match details card
      | players      |
      | S. Tsitsipas |
      | N. Djokovic  |
    Then I can navigate to "N. Djokovic" profile by selecting the name

  Scenario: can see match details-Singles
    And I select a match card with following Players
      | players      |
      | S. Tsitsipas |
      | N. Djokovic  |
    Then I can see following players on match details card
      | players      |
      | S. Tsitsipas |
      | N. Djokovic  |

  Scenario: can see match details-Doubles
    And I select "Day 4"
    And I select a match card with following Players
      | players       |
      | B. Krejcikova |
      | K. Siniakova  |
      | U. Eikeri     |
      | C. Harrison   |
    Then I can see following players on match details card
      | players       |
      | B. Krejcikova |
      | K. Siniakova  |
      | U. Eikeri     |
      | C. Harrison   |

  @AODS-5799@Smoke
  Scenario: can open players profile using Match Schedule page and verify the player’s details
    When I click on name of player "S. Tsitsipas "
    Then I see all details of the player
      | Player             | SinglesRank | DoublesRank | Age      | Born           | Height            | Weight         | PlayingHand  |
      | Stefanos Tsitsipas | 6           | 209         | 25 years | Athens, Greece | 193cm (6 ft 4 in) | 90kg (198 lbs) | Right-handed |

  @AODS-5946 @Live
  Scenario: can see "Scheduled" status on the Matchcard on Schedule page
    Then I select "Day 1" from daypicker
    Then I see "Scheduled" as status on Match Schedule page for that matchcard
      | playerOneName | playerTwoName |
      | K. Siniakova  | C. Gauff      |

  @AODS-5945 @Live
  Scenario: can see "On Court" status on the Matchcard on Schedule page
    Then I select "Day 1" from daypicker
    Then I see "On Court" as status on Match Schedule page for that matchcard
      | playerOneName | playerTwoName |
      | K. Siniakova  | C. Gauff      |

  @AODS-5944 @Live
  Scenario: can see "Warm-up" status on the Matchcard on Schedule page
    Then I select "Day 1" from daypicker
    Then I see "Warm-up" as status on Match Schedule page for that matchcard
      | playerOneName | playerTwoName |
      | K. Siniakova  | C. Gauff      |

  @AODS-5943 @Live
  Scenario: can see "LIVE" status on the Matchcard on Schedule page
    Then I select "Day 1" from daypicker
    Then I see "LIVE" as status on Match Schedule page for that matchcard
      | playerOneName | playerTwoName |
      | K. Siniakova  | C. Gauff      |

  @AODS-5942 @Live
# To see Rescheduled matches, pause SIM on Day 3 (01/18) at 02:17:41
  Scenario: can see "Rescheduled" status on the Matchcard on Schedule page
    Then I select "Day 2" from daypicker
    Then I see "Rescheduled" as status on Match Schedule page for that matchcard
      | playerOneName | playerTwoName |
      | T. Kokkinakis | F. Fognini    |


