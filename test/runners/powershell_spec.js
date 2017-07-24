var expect = require('chai').expect,
    runner = require('../runner');

describe('powershell runner', function () {
    describe('.run', function () {
        runner.assertCodeExamples('powershell');

        it('should execute simple statement', function (done) {
            runner.run({
                language: 'powershell',
                code: 'Write-Host "Hello, World!"'
            }, function (buffer) {
                expect(buffer.stdout).to.contain('Hello, World!\n');
                done();
            });
        });

        it('should handel basic Pester tests', function (done) {
            runner.run({
                language: 'powershell',
                code: '$CustomVar = 5',
                fixture: 'Describe "Basic Tests" { It "X" { 1 | Should Be 1 }; It "Y" { 1 | Should Be 2 }}'

            }, function (buffer) {
                expect(buffer.stdout).to.contain("<PASSED::>");
                expect(buffer.stdout).to.contain("<FAILED::>");
                expect(buffer.stdout).to.contain("<DESCRIBE::>");
                expect(buffer.stdout).to.contain("<IT::>");
                done();
            });
        });
    });
});