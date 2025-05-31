/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path = require('path')
import { Request, Response, NextFunction } from 'express'

const allowedFiles = new Set(['key1.pem', 'key2.pem', 'key3.pem']);

module.exports = function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file

    if (allowedFiles.has(file)) {
      res.sendFile(path.resolve('encryptionkeys/', file))
    } else {
      res.status(403)
      next(new Error('File is not allowed!'))
    }
  }
}
