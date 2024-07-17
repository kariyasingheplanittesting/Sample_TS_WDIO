@Web
Feature: AO Web - Event stats
 As a user,

  I would like to see the latest singles Aces information

 

  Background:

    Given I am on Ao web home page

    When I navigate to 'Statistics' under 'Tournament'

    Then I see the Event Stats page

 

  Scenario: I  can view Double Faults

    When I change the dropdown to "Double faults"

    Then I see MEN’S LEADER "Denis Shapovalov" as "32" and WOMEN’S LEADER "Linda Fruhvirtova" as "30"

    Then I can view player <Player> and <Double faults> as the score

    Examples:

      | Player             | Double faults |

      | Denis Shapovalov   | 32            |

      | Linda Fruhvirtova  | 30            |

      | Stefanos Tsitsipas | 25            |

      | Novak Djokovic     | 25            |