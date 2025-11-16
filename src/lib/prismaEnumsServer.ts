// lib/prismaEnumsServer.ts
import prisma from '~/prisma/client';

export async function getFormOptions() {
  const dmmfEnums = (prisma as any)._dmmf?.datamodel?.enums || [];

  // Get enum values
  const getEnumValues = (name: string) => {
    const e = dmmfEnums.find((enumObj: any) => enumObj.name === name);
    return e ? e.values.map((v: any) => v.name) : [];
  };

  const classificationOptions = getEnumValues('TaskClassification');
  const requestTypeOptions = getEnumValues('RequestType');
  const priorityOptions = getEnumValues('Priority');
  const zoneOptions = getEnumValues('Zone');
  const specificRequestOptions = getEnumValues('SpecificRequestType');

  // Get all users for handler dropdown
  const users = await prisma.user.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
  });
  const handlerOptions = users.map(u => u.name).filter(Boolean);

  return {
    classificationOptions,
    requestTypeOptions,
    priorityOptions,
    zoneOptions,
    specificRequestOptions,
    handlerOptions,
  };
}
