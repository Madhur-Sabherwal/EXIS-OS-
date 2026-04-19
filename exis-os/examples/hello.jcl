//HELLO    JOB (ACCT),'EXIS SMOKE',CLASS=A,MSGCLASS=X,NOTIFY=&SYSUID
//STEP1    EXEC PGM=IEFBR14
//SYSPRINT DD SYSOUT=*
//*
//* Minimal "do nothing successfully" job. IEFBR14 is the classic
//* z/OS no-op: it sets RC=0 and exits, which makes it perfect for
//* validating that the submit path works end-to-end.
//*
