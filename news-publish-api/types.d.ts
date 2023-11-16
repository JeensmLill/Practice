declare namespace Mongoose {
    type Model = import('mongoose').Model<any>;
    type Document = import('mongoose').Document;
}
declare namespace Controllers {
    // utils type
    type Form_doc = {
        Model: Mongoose.Model,
        documents: Mongoose.Document[]
    };
    type Form_refered = {
        Model: Mongoose.Model,
        field: string
    };
    type Form_refered_oneToMany = {
        field: string,
        fieldVal: string
    };
    type Form_refered_manyToMany = {
        aField: string,
        aFieldVal: string,
        bField: string,
        bFieldVals: string[]
    };
    type Form_joined = {
        Model: Mongoose.Model,
        field: string,
        joined?: Form_joined
    };
    type Form_joined_unnested = Omit<Form_joined, 'joined'>;

    type Options_validReferedDoc = Form_refered[];
    type Options_readJoinedDoc = Form_joined[];
    type Options_filterInvalidReferedDoc = Form_refered[];

    type Option_readSelfJoinedDoc = Form_joined_unnested;
    type Option_deleteDoc = {
        onBeforeDelete?(doc?: Mongoose.Document),
        onDeleted?(doc?: Mongoose.Document)
    };
    type Option_delJoinedDoc = {
        joined: Form_joined_unnested,
        onBeforeDelete?(docs?: Mongoose.Document[]),
        onDeleted?(docs?: Mongoose.Document[])
    };
    type Option_setReferedDoc_manyToMany = {
        referedForm: Form_refered_manyToMany,
        docDatas?: Object[],
        onBeforeCreate?(doc?: Object),
        onCreated?(doc?: Mongoose.Document)
        onBeforeDelete?(doc?: Mongoose.Document),
        onDeleted?(doc?: Mongoose.Document)
    };
    type Option_setReferedDoc_oneToMany = {
        referedForm: Form_refered_oneToMany,
        docDatas?: Object[],
        onBeforeCreate?(doc?: Object),
        onCreated?(doc?: Mongoose.Document)
        onBeforeDelete?(doc?: Mongoose.Document),
        onDeleted?(doc?: Mongoose.Document)
    };

    // user
    namespace User {
        type Form_createOne = {
            username: string;
            password: string;
            _area: string;
            _role: string;
            avatar: string;
          };
        type Form_getList = {
            page: string | number;
            limit: string | number;
        };
        type Form_updateOne = {
            _id: string;
            username?: string;
            password?: string;
            _area?: string;
            _role?: string;
            avatar?: string;
            enable?: boolean;
          };
    }
}