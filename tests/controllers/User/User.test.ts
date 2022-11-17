import {describe, expect} from '@jest/globals';
import * as request from "supertest";
import express from '../../../src/providers/Express';
import User from '../../../src/models/user.schema';
import db from '../../../src/providers/Database'

jest.setTimeout(20000)
describe('User Controller Tests', () => {
    beforeAll(async () => {
       await db.init();
       await User.deleteMany();
       await new User({
        name: 'test1',
        emailAddress: 'test1@email.com',
        monthlySalary: 2000,
        monthlyExpense:1500
    }).save(); 
    })
    
    afterAll(async () => {
     await db.close()
    })

    it('should create a new user', async () => {
        const response = await request(express.app).post('/api/createUser').send({
            name: 'test1',
            emailAddress: 'test2@email.com',
            monthlySalary: 2000,
            monthlyExpense:1500
        }).expect(201)

        // Assert that the database was changed correctly
        const user = await User.findOne({emailAddress:response.body.emailAddress})
        expect(response.statusCode).toEqual(201)
        expect(user).not.toBeNull()
    
        // Assertions about the response
        expect(response.body.emailAddress).toBe('test2@email.com')
    })

    
    it('should not recreate existing user', async () => {

      await request(express.app).post('/api/createUser').send({
            name: 'test1',
            emailAddress: 'test1@email.com',
            monthlySalary: 2000,
            monthlyExpense:1500
        }).expect(400);

    })
})
