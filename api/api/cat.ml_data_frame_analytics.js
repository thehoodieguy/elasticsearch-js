// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatMlDataFrameAnalytics (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'allow_no_match',
    'bytes',
    'format',
    'h',
    'help',
    's',
    'time',
    'v'
  ]

  const snakeCase = {
    allowNoMatch: 'allow_no_match'

  }

  /**
   * Perform a cat.ml_data_frame_analytics request
   * http://www.elastic.co/guide/en/elasticsearch/reference/current/get-dfanalytics-stats.html
   */
  return function catMlDataFrameAnalytics (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((id) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_cat' + '/' + 'ml' + '/' + 'data_frame' + '/' + 'analytics'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildCatMlDataFrameAnalytics
