import { ok, text } from '@/presentation/helpers/index.ts'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.ts'

export class AttributesDetailsController implements Controller {
  attributesDetails = {
    strength: text`
      The character's physical strength. The Strength
      attribute is used in all rolls that are related to the
      character's physical strength, changing the damage dealt by
      hand weapons. This attribute is predominant in characters with
      focus in action and physical strength. Strength is widely used
      in tests related to climbing, swimming, close combat, push and
      pull objects, etc.
    `,
    dexterity: text`
      The character's speed, agility and manual skill.
      Governs eye-hand coordination, reflexes, balance and speed.
      This attribute controls the ability to hit ranged targets,
      attacks with weapons that require dexterity and skill, and
      the character's moviment speed. Combat attack and defense rolls
      must use dexterity or strength depending on context, weapon type and
      fighting style.
    `,
    constitution: text`
      The character's physical resistance, his breath,
      the ability to resist to things like disease and poison. Also governs
      the character's HP (Health Points), the initial HP is equal to
      10 + constitution + strength. Constitution is used in rolls related
      to tiredness, prolonged physical exertion, to resist unexpected physical
      impacts, resist to disease, poison, pain, etc.
    `,
    intelligence: text`
      The character's intelligence reflects his logical thinking
      ability, ability to learn, his memory and his magical affinity.
      Intelligence is used in all rolls related to character's
      accumuleted intelectual knowledge. Rolls related to general or
      academic knowledge, solving puzzles, learning, ability to research,
      learn new things or about magic, etc. Also governs the character's MP
      (Mana/Magic Points), the initial MP is equal to 10 + intelligence.
    `,
    wisdom: text`
      The character's perception, intuition, sensitivity, intuitive
      knowledge, faith and willpower. Used in rolls related to
      hearing, perceiving, seeing, sensing danger, perceiving
      motivation, visualizing a target, espiritual or divine connection,
      perceiving mystical energies or supernatural presences.
      Also governs the character's passive perception which is represented
      by 6 + wisdom.
    `,
    charisma: text`
      The character's social charisma, ability to influence people,
      convince, seduce, inspire, encourage, etc. Used in rolls related
      to social interactions, discussions, artistic demonstrations,
      bargains, etc.
    `
  }
  
  handle(): Promise<HTTPResponse> {
    return Promise.resolve(ok(this.attributesDetails))
  }
}
