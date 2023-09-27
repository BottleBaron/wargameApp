

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
                title: 'Have 1 unit in the enemy deployment zone',
                pointsPerCompletion: 5,
                cumulativeCount: 0
            },
            {
                title: 'Have 2+ units in the enemy deployment zone',
                pointsPerCompletion: 5,
                cumulativeCount: 0
            },
        ],
    },
]
