'use strict'

const ENVIRONMENT_LOCAL = 'local'
const ENVIRONMENT_TEST = 'test'
const ENVIRONMENT_ACCEPTANCE = 'acceptance'
const ENVIRONMENT_PRODUCTION = 'production'

const ENVIRONMENT_DEFAULT = ENVIRONMENT_LOCAL
const ENVIRONMENT = window.EnvironmentSettings.environment

/**
 * Simple Object to check in which environment we are on based on the hostname
 */
class Environment {
  get get() {
    return ENVIRONMENT || ENVIRONMENT_DEFAULT
  }

  get isLocal() {
    return this.get === ENVIRONMENT_LOCAL
  }

  get isTest() {
    return this.get === ENVIRONMENT_TEST
  }

  get isAcceptance() {
    return this.get === ENVIRONMENT_ACCEPTANCE
  }

  get isProduction() {
    return this.get === ENVIRONMENT_PRODUCTION
  }
}

const environment = new Environment()

export default environment
