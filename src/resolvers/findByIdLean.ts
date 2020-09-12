import { toInputType } from 'graphql-compose';
import type { Resolver, ObjectTypeComposer } from 'graphql-compose';
import type { Model, Document } from 'mongoose';
import { projectionHelper, prepareAliases, prepareAliasesReverse, replaceAliases } from './helpers';
import type { ExtendedResolveParams } from './index';
import { beforeQueryHelperLean } from './helpers/beforeQueryHelper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FindByIdLeanResolverOpts {}

type TArgs = {
  _id: any;
};

export function findByIdLean<TSource = any, TContext = any, TDoc extends Document = any>(
  model: Model<TDoc>,
  tc: ObjectTypeComposer<TDoc, TContext>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts?: FindByIdLeanResolverOpts
): Resolver<TSource, TContext, TArgs, TDoc> {
  if (!model || !model.modelName || !model.schema) {
    throw new Error('First arg for Resolver findByIdLean() should be instance of Mongoose Model.');
  }

  if (!tc || tc.constructor.name !== 'ObjectTypeComposer') {
    throw new Error(
      'Second arg for Resolver findByIdLean() should be instance of ObjectTypeComposer.'
    );
  }

  const aliases = prepareAliases(model);
  const aliasesReverse = prepareAliasesReverse(model);

  return tc.schemaComposer.createResolver<TSource, TArgs>({
    type: tc,
    name: 'findByIdLean',
    kind: 'query',
    args: {
      _id: tc.hasField('_id') ? toInputType(tc.getFieldTC('_id')).NonNull : 'MongoID!',
    },
    resolve: (async (resolveParams: ExtendedResolveParams<TDoc>) => {
      const args = resolveParams.args || {};

      if (args._id) {
        resolveParams.query = model.findById(args._id);
        resolveParams.model = model;
        projectionHelper(resolveParams, aliases);
        const result = await beforeQueryHelperLean(resolveParams);
        return result && aliasesReverse ? replaceAliases(result, aliasesReverse) : result;
      }
      return Promise.resolve(null);
    }) as any,
  });
}
