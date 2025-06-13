exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('wallets', {
    id: 'id',
    user_id: {
      type: 'integer',
      references: '"users"',
      onDelete: 'cascade',
      notNull: true,
    },
    crypto_type: { type: 'varchar(10)', notNull: true },
    public_key: { type: 'varchar(255)', notNull: true },
    private_key: { type: 'text' }, // only if custodial
    balance: { type: 'numeric(30, 18)', notNull: true, default: 0 },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('destination_addresses', {
    id: 'id',
    user_id: {
      type: 'integer',
      references: '"users"',
      onDelete: 'cascade',
      notNull: true,
    },
    crypto_type: { type: 'varchar(10)', notNull: true },
    address: { type: 'varchar(255)', notNull: true },
    label: { type: 'varchar(100)' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('payments', {
    id: 'id',
    user_id: {
      type: 'integer',
      references: '"users"',
      onDelete: 'cascade',
      notNull: true,
    },
    tx_hash: { type: 'varchar(255)', notNull: true, unique: true },
    crypto_type: { type: 'varchar(10)', notNull: true },
    amount: { type: 'numeric(30, 18)', notNull: true },
    status: { type: 'varchar(20)', notNull: true, default: 'pending' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('payments');
  pgm.dropTable('destination_addresses');
  pgm.dropTable('wallets');
  pgm.dropTable('users');
};
