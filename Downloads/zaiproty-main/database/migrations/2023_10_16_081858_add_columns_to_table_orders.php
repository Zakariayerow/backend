<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->string('payment_method', 100)->nullable()->after('deposit_slip_id');
            $table->string('reference_code')->nullable()->after('payment_method');
            $table->string('slip_document')->nullable()->after('reference_code');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->dropColumn('payment_method');
            $table->dropColumn('reference_code');
            $table->dropColumn('slip_document');
        });
    }
};
