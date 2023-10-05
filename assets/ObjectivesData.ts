

export interface SecondaryObjective {
    id: number
    name: string
    objectiveRule: string
    isCumulative: boolean
    subRules: ObjectiveSubRule[]
}

export interface ObjectiveSubRule {
    title: string
    pointsPerCompletion: number
    isChecked?: boolean
    cumulativeCount?: number
}

export const secondaryObjectives: SecondaryObjective[] = [
    {
        id: 1,
        name: 'Area Denial',
        objectiveRule: 'Have a unit wholly within 6" of the center and:',
        isCumulative: false,
        subRules: [
            {
                title: 'No enemy units within 3" of the center',
                pointsPerCompletion: 3,
            },
            {
                title: 'No enemy units wholly within 6" of the center',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 2,
        name: 'Assasination',
        objectiveRule: '',
        isCumulative: false,
        subRules: [
            {
                title: 'Destroyed 1+ enemy characters',
                pointsPerCompletion: 5,
            },
            {
                title: 'All enemy characters are destroyed',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 3,
        name: 'A Tempting Target',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Control the selected objective',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 4,
        name: 'Behind Enemy Lines',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Have 1 unit in the enemy deployment zone',
                pointsPerCompletion: 5,
            },
            {
                title: 'Have 2+ units in the enemy deployment zone',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 5,
        name: 'Bring It Down',
        objectiveRule: 'Gain 1 additional point if any of the conditions below are met',
        isCumulative: true,
        subRules: [
            {
                title: 'Monster or Vehicles with 0-9 wounds\ndestroyed',
                pointsPerCompletion: 2,
                cumulativeCount: 0
            },
            {
                title: 'Monster or Vehicles with 10-14 wounds\ndestroyed',
                pointsPerCompletion: 3,
                cumulativeCount: 0
            },
            {
                title: 'Monster or Vehicles with 15-19 wounds\ndestroyed',
                pointsPerCompletion: 4,
                cumulativeCount: 0
            },
            {
                title: 'Monster or Vehicles with 20+ wounds\ndestroyed',
                pointsPerCompletion: 5,
                cumulativeCount: 0
            },
        ],
    },
    {
        id: 6,
        name: 'Capture Enemy Outpost',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Control an objective in the enemy\ndeployment zone',
                pointsPerCompletion: 8,
            },
        ],
    },
    {
        id: 7,
        name: 'Cleanse',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Cleansed 1 objective',
                pointsPerCompletion: 3,
            },
            {
                title: 'Cleansed 2+ objectives',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 8,
        name: 'Defend Stronghold',
        objectiveRule: 'Scored at the end of your opponents turn\n(Cannot be drawn first turn)',
        isCumulative: false,
        subRules: [
            {
                title: 'Control an objective in your deployment zone',
                pointsPerCompletion: 3,
            },
        ],
    },
    {
        id: 9,
        name: 'Deploy Teleport Homer',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Deployed teleport homer in center',
                pointsPerCompletion: 3,
            },
            {
                title: 'Deployed teleport homer in the enemy\ndeployment zone',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 10,
        name: 'Engage On All Fronts',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Units Within 3 quarters',
                pointsPerCompletion: 3,
            },
            {
                title: 'Units within 4 quarters',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 11,
        name: 'Extend battle lines',
        objectiveRule: 'Scored at the end of your turn',
        isCumulative: false,
        subRules: [
            {
                title: 'Control an objective in your DZ\nand in No Mans Land',
                pointsPerCompletion: 5,
            },
            {
                title: 'Control an objective in No Mans Land\n(At least 1 unit left)',
                pointsPerCompletion: 2,
            },
        ],
    },
    {
        id: 12,
        name: 'Investigate Signals',
        objectiveRule: '',
        isCumulative: false,
        subRules: [
            {
                title: 'Scanned 1 corner',
                pointsPerCompletion: 2,
            },
            {
                title: 'Scanned 2 corners',
                pointsPerCompletion: 4,
            },
            {
                title: 'Scanned 3 corners',
                pointsPerCompletion: 6,
            },
            {
                title: 'Scanned 4 corners',
                pointsPerCompletion: 8,
            },
        ],
    },
    {
        id: 13,
        name: 'No Prisoners',
        objectiveRule: '',
        isCumulative: false,
        subRules: [
            {
                title: 'Destroyed 1 enemy unit',
                pointsPerCompletion: 2,
            },
            {
                title: 'Destroyed 2 enemy units',
                pointsPerCompletion: 4,
            },
            {
                title: 'Destroyed 3+ enemy units',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 14,
        name: 'Overwhelming Force',
        objectiveRule: '',
        isCumulative: false,
        subRules: [
            {
                title: 'Destroyed 1 enemy unit on an objective',
                pointsPerCompletion: 3,
            },
            {
                title: 'Destroyed 2+ enemy units on objectives',
                pointsPerCompletion: 5,
            },
        ],
    },
    {
        id: 15,
        name: 'Storm Hostile Objective',
        objectiveRule: 'Scored at the end of your turn\n(Cannot be drawn first turn)',
        isCumulative: false,
        subRules: [
            {
                title: 'Control an objective your opponent controlled',
                pointsPerCompletion: 5,
            },
            {
                title: 'Conntrol a new objective while your\nopponent controls none',
                pointsPerCompletion: 5,
            },
        ],
    },
]
