import { War } from './types';

// A curated list of major conflicts to serve as the daily puzzle source.
export const WARS: War[] = [
  { 
    id: 'ww2', 
    name: 'World War II', 
    years: '1939-1945', 
    deaths: 75000000,
    description: 'The deadliest conflict in human history, involving the vast majority of the world\'s nations organized into the Allies and the Axis. It was marked by mass deaths of civilians, including the Holocaust and the strategic bombing of industrial and population centers, ending with the use of nuclear weapons.'
  },
  { 
    id: 'ww1', 
    name: 'World War I', 
    years: '1914-1918', 
    deaths: 17000000,
    description: 'A global war originating in Europe that led to the mobilization of more than 70 million military personnel. It was characterized by the stalemate of trench warfare, the introduction of chemical weapons and tanks, and resulted in the collapse of the German, Austro-Hungarian, Ottoman, and Russian empires.'
  },
  { 
    id: 'civil_war_us', 
    name: 'American Civil War', 
    years: '1861-1865', 
    deaths: 620000,
    description: 'A brutal civil war fought between the Union ("the North") and the Confederacy ("the South"), which had seceded primarily to uphold the institution of slavery. It remains the deadliest war in U.S. history and resulted in the abolition of slavery and the preservation of the United States as a single entity.'
  },
  { 
    id: 'vietnam', 
    name: 'Vietnam War', 
    years: '1955-1975', 
    deaths: 1353000,
    description: 'A Cold War-era proxy conflict in Vietnam, Laos, and Cambodia, fought between North Vietnam—supported by the Soviet Union and China—and South Vietnam, supported by the United States. It was defined by guerrilla warfare, heavy aerial bombing, and intense domestic opposition in the U.S.'
  },
  { 
    id: 'korean', 
    name: 'Korean War', 
    years: '1950-1953', 
    deaths: 2500000,
    description: 'A war between North Korea (with Chinese and Soviet support) and South Korea (with UN and US support) that began when the North invaded the South. The conflict saw rapid fluctuations in territory before stabilizing near the 38th parallel, ending in an armistice rather than a peace treaty.'
  },
  { 
    id: 'napoleonic', 
    name: 'Napoleonic Wars', 
    years: '1803-1815', 
    deaths: 3500000,
    description: 'A series of major conflicts pitting the French Empire and its allies, led by Napoleon I, against a fluctuating array of European coalitions. These wars revolutionized European armies and played out on an unprecedented scale, dissolving the Holy Roman Empire and planting the seeds of nationalism.'
  },
  { 
    id: 'thirty_years', 
    name: 'Thirty Years\' War', 
    years: '1618-1648', 
    deaths: 8000000,
    description: 'One of the most destructive conflicts in European history, starting as a religious war between Protestants and Catholics in the Holy Roman Empire. It evolved into a general political power struggle involving most major European powers, devastating entire regions through famine and disease.'
  },
  { 
    id: 'taiping', 
    name: 'Taiping Rebellion', 
    years: '1850-1864', 
    deaths: 20000000,
    description: 'A massive civil war in China waged against the ruling Manchu-led Qing dynasty by the Taiping Heavenly Kingdom, led by Hong Xiuquan. It is one of the deadliest wars in history, characterized by total war, religious fanaticism, and siege warfare that decimated the population of the Yangtze Delta.'
  },
  { 
    id: 'mongol', 
    name: 'Mongol Conquests', 
    years: '1206-1368', 
    deaths: 40000000,
    description: 'The rapid military expansion of the Mongol Empire across Asia and Eastern Europe, creating the largest contiguous land empire in history. The campaigns were known for their speed, tactical brilliance, and often brutal destruction of cities that refused to surrender, altering the demography of entire regions.'
  },
  { 
    id: 'three_kingdoms', 
    name: 'War of the Three Kingdoms', 
    years: '220-280', 
    deaths: 38000000,
    description: 'A turbulent period in Chinese history following the collapse of the Han dynasty, characterized by the tripartite division of the state between Wei, Shu, and Wu. It was an era of constant warfare, political intrigue, and population collapse, immortalized in literature as a time of heroes and chaos.'
  },
  { 
    id: 'russian_civil', 
    name: 'Russian Civil War', 
    years: '1917-1922', 
    deaths: 9000000,
    description: 'A multi-party civil war in the former Russian Empire immediately after the Russian Revolutions, fought primarily between the Red Army (Bolsheviks) and the White Army. The conflict involved foreign interventions and was compounded by the devastation of WWI, typhus epidemics, and widespread famine.'
  },
  { 
    id: 'seven_years', 
    name: 'Seven Years\' War', 
    years: '1756-1763', 
    deaths: 868000,
    description: 'A global conflict fought between 1756 and 1763, involving every European great power of the time and spanning five continents. It was driven by the antagonism between Great Britain and France for colonial dominance and by the rivalry between Prussia and Austria for hegemony in Germany.'
  },
  { 
    id: 'iraq', 
    name: 'Iraq War', 
    years: '2003-2011', 
    deaths: 461000,
    description: 'A protracted armed conflict that began with the invasion of Iraq by a United States-led coalition that toppled the government of Saddam Hussein. The war evolved into an insurgency and civil conflict involving sectarian violence between Shias and Sunnis and the rise of extremist groups.'
  },
  { 
    id: 'afghanistan', 
    name: 'War in Afghanistan', 
    years: '2001-2021', 
    deaths: 176000,
    description: 'Triggered by the September 11 attacks, this war began with the US invasion to dismantle al-Qaeda and remove the Taliban from power. It became the longest war in US history, involving a twenty-year insurgency that ultimately ended with the withdrawal of coalition forces and the Taliban regaining control.'
  },
  { 
    id: 'spanish_civil', 
    name: 'Spanish Civil War', 
    years: '1936-1939', 
    deaths: 500000,
    description: 'A widely watched civil war in Spain fought between the democratically elected Republicans (loyalists) and the Nationalists led by General Francisco Franco. It served as a testing ground for the military technologies and ideologies of WWII, with Nazi Germany supporting Franco and the Soviet Union supporting the Republic.'
  },
  { 
    id: 'balkan', 
    name: 'Balkan Wars', 
    years: '1912-1913', 
    deaths: 140000,
    description: 'Two consecutive conflicts in the Balkan Peninsula that resulted in the Ottoman Empire losing almost all of its remaining territory in Europe. The wars set the stage for the First World War by destabilizing the region and heightening tensions between the Great Powers and the Balkan states.'
  },
  { 
    id: 'crimean', 
    name: 'Crimean War', 
    years: '1853-1856', 
    deaths: 500000,
    description: 'A military conflict in which the Russian Empire lost to an alliance of the Ottoman Empire, France, Britain, and Sardinia. It was one of the first "modern" wars to use explosive naval shells and railways, and is famous for the logistical and medical failures that led to the nursing reforms of Florence Nightingale.'
  },
  { 
    id: 'boer', 
    name: 'Second Boer War', 
    years: '1899-1902', 
    deaths: 75000,
    description: 'A war fought between the British Empire and the two independent Boer states, the South African Republic and the Orange Free State. It is known for the British use of concentration camps to counter Boer guerrilla tactics, a strategy that caused high civilian mortality and lasting bitterness.'
  },
  { 
    id: 'gulf', 
    name: 'Gulf War', 
    years: '1990-1991', 
    deaths: 35000,
    description: 'A war waged by coalition forces from 35 nations led by the United States against Iraq in response to Iraq\'s invasion and annexation of Kuwait. It was characterized by the overwhelming application of air power and precision-guided munitions, leading to a decisive and rapid coalition victory.'
  },
  { 
    id: 'mexican_rev', 
    name: 'Mexican Revolution', 
    years: '1910-1920', 
    deaths: 2000000,
    description: 'A major armed struggle that transformed Mexican culture and government, ending the dictatorship of Porfirio Díaz. It was not a unified war but a series of regional conflicts involving varied factions led by figures like Pancho Villa and Emiliano Zapata, resulting in a new constitution.'
  },
  { 
    id: 'timur', 
    name: 'Conquests of Timur', 
    years: '1370-1405', 
    deaths: 17000000,
    description: 'The brutal military campaigns of the Turco-Mongol conqueror Timur, who founded the Timurid Empire in modern-day Afghanistan, Iran, and Central Asia. His conquests were infamous for their scale of destruction, with estimates suggesting his campaigns killed 5% of the world\'s population at the time.'
  },
  { 
    id: 'an_lushan', 
    name: 'An Lushan Rebellion', 
    years: '755-763', 
    deaths: 13000000,
    description: 'A devastating rebellion against the Tang dynasty of China led by general An Lushan, marking the beginning of the dynasty\'s decline. The revolt spanned the reigns of three emperors and resulted in a massive loss of life and economic destruction that permanently weakened the central Tang administration.'
  },
  { 
    id: 'hundred_years', 
    name: 'Hundred Years\' War', 
    years: '1337-1453', 
    deaths: 3500000,
    description: 'A series of conflicts waged between the House of Plantagenet and the House of Valois over the right to rule the Kingdom of France. It saw the rise of national identity in both England and France and major military innovations like the longbow and early gunpowder artillery.'
  },
  { 
    id: 'french_religion', 
    name: 'French Wars of Religion', 
    years: '1562-1598', 
    deaths: 3000000,
    description: 'A prolonged period of war and popular unrest between Catholics and Huguenots (Reformed/Protestant) in the Kingdom of France. The conflict involved severe violence and massacres, such as the St. Bartholomew\'s Day massacre, and ended with the Edict of Nantes granting religious toleration.'
  },
  { 
    id: 'nigerian_civil', 
    name: 'Nigerian Civil War', 
    years: '1967-1970', 
    deaths: 2000000,
    description: 'Also known as the Biafran War, this was a civil war fought between the government of Nigeria and the secessionist state of Biafra. The conflict is notorious for the blockade imposed on Biafra, which led to a catastrophic famine that caused the majority of the war\'s casualties.'
  },
  { 
    id: 'soviet_afghan', 
    name: 'Soviet-Afghan War', 
    years: '1979-1989', 
    deaths: 1500000,
    description: 'A major conflict of the Cold War wherein insurgent groups known as the Mujahideen fought against the Soviet Army and the Democratic Republic of Afghanistan. The war became a "quagmire" for the Soviet Union, contributing to its eventual dissolution, and left Afghanistan with deep political instability.'
  },
  { 
    id: 'punic', 
    name: 'Punic Wars', 
    years: '264-146 BC', 
    deaths: 1500000,
    description: 'A series of three wars fought between Rome and Carthage, at the time the two largest powers in the Mediterranean. They included Hannibal\'s famous crossing of the Alps and ultimately resulted in the complete destruction of Carthage, securing Rome\'s dominance over the region for centuries.'
  },
  { 
    id: 'iran_iraq', 
    name: 'Iran-Iraq War', 
    years: '1980-1988', 
    deaths: 750000,
    description: 'A protracted armed conflict between Iran and Iraq, triggered by Iraq\'s invasion of Iran. It was characterized by WWI-style trench warfare, human wave attacks, and the extensive use of chemical weapons, ending in a stalemate with no significant territorial changes after eight years.'
  },
  { 
    id: 'paraguayan', 
    name: 'War of the Triple Alliance', 
    years: '1864-1870', 
    deaths: 400000,
    description: 'The deadliest inter-state war in Latin America\'s history, fought between Paraguay and the Triple Alliance of Argentina, Brazil, and Uruguay. The war devastated Paraguay, causing the death of approximately 60% of its population and nearly 90% of its adult male population.'
  },
  { 
    id: 'winter_war', 
    name: 'Winter War', 
    years: '1939-1940', 
    deaths: 160000,
    description: 'A military conflict between the Soviet Union and Finland, initiated by a Soviet invasion shortly after the start of WWII. Despite being vastly outnumbered and outgunned, the Finnish army put up a fierce defense using ski troops and guerrilla tactics, inflicting heavy casualties on the Soviet forces.'
  },
];

export const MAX_GUESSES = 6;
export const ERROR_TOLERANCE_PERCENT = 0.1; 
export const WIN_MARGIN = 0.05;